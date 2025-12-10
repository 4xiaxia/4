import React, { useEffect, useRef, useState } from 'react';
import { Card, Spin, Alert } from 'antd';
import * as mapService from '../services/mapService';
import { getSpots } from '../services/apiService';
import { Spot } from '../types';

const MapView: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<AMap.Map | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const initializeMap = async () => {
      if (!mapContainerRef.current) return;

      try {
        await mapService.loadMapSDK();
        
        if (!isMounted || !mapContainerRef.current) return;

        const map = mapService.initMap(mapContainerRef.current, [118.205, 25.235], 16);
        mapInstanceRef.current = map;

        const response = await getSpots();
        const spots: Spot[] = response.data;

        if (!isMounted) return;

        spots.forEach(spot => {
          const coord = spot.coord ? spot.coord.split(',').map(Number) : null;
          if (coord && coord.length === 2 && !isNaN(coord[0]) && !isNaN(coord[1])) {
            const [lng, lat] = coord;
            const marker = mapService.addMarker(map, [lng, lat], { title: spot.name });

            marker.on('click', () => {
              const infoWindow = new window.AMap.InfoWindow({
                content: `
                  <div style="padding: 10px;">
                    <h4 style="margin: 0 0 5px 0;">${spot.name}</h4>
                    <button onclick="window.handleMapNav(${lng}, ${lat}, '${spot.name}')">导航</button>
                  </div>
                `,
              });
              const position = marker.getPosition();
              if (position) {
                infoWindow.open(map, [position.getLng(), position.getLat()]);
              }
            });
          }
        });

        const path = spots
          .map(spot => {
            const coord = spot.coord ? spot.coord.split(',').map(Number) : null;
            return coord && coord.length === 2 && !isNaN(coord[0]) && !isNaN(coord[1]) ? coord : null;
          })
          .filter(p => p !== null) as [number, number][];

        if (path.length > 1) {
          mapService.drawPolyline(map, path);
        }

        setLoading(false);

      } catch (err) {
        if (isMounted) {
          console.error(err);
          setError(err instanceof Error ? err.message : '地图加载失败');
          setLoading(false);
        }
      }
    };

    (window as any).handleMapNav = mapService.navigateTo;

    initializeMap();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy();
        mapInstanceRef.current = null;
      }
      delete (window as any).handleMapNav;
    };
  }, []);

  return (
    <Card title="东里村智能地图导览">
      {error && <Alert message={error} type="error" showIcon />}
      <Spin spinning={loading} tip="地图加载中...">
        <div ref={mapContainerRef} style={{ height: '600px', width: '100%' }} />
      </Spin>
    </Card>
  );
};

export default MapView;
