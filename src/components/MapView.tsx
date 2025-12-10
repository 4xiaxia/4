import React, { useEffect, useRef, useState } from 'react';
import { Card, Spin, Alert } from 'antd';
import * as mapService from '../services/mapService';
import { getSpots } from '../services/apiService';

// 定义景点数据类型
interface Spot {
  id: string;
  name: string;
  coord: string; // "lng,lat"
  // ... 其他属性
}

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
        
        // 确保在组件挂载状态下继续
        if (!isMounted) return;

        const map = mapService.initMap(mapContainerRef.current, [118.205, 25.235], 16); // 东里村中心坐标
        mapInstanceRef.current = map;

        // 从后端获取景点数据
        const response = await getSpots();
        const spots: Spot[] = response.data;

        if (!isMounted) return;

        // 在地图上标记景点
        spots.forEach(spot => {
          const [lng, lat] = spot.coord.split(',').map(Number);
          if (!isNaN(lng) && !isNaN(lat)) {
            const marker = mapService.addMarker(map, [lng, lat], { title: spot.name });
            // 添加点击事件，弹出信息窗体
            marker.on('click', () => {
              const infoWindow = new window.AMap.InfoWindow({
                content: `
                  <div style="padding: 10px;">
                    <h4 style="margin: 0 0 5px 0;">${spot.name}</h4>
                    <button onclick="window.handleMapNav(${lng}, ${lat}, '${spot.name}')">导航</button>
                  </div>
                `,
              });
              infoWindow.open(map, marker.getPosition());
            });
          }
        });

        // 绘制路线 (示例：连接所有景点)
        const path = spots
          .map(spot => {
            const [lng, lat] = spot.coord.split(',').map(Number);
            return !isNaN(lng) && !isNaN(lat) ? [lng, lat] : null;
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

    // 将导航函数挂载到window上，以便信息窗体中的按钮可以调用
    (window as any).handleMapNav = mapService.navigateTo;

    initializeMap();

    return () => {
      isMounted = false;
      // 销毁地图实例
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy();
        mapInstanceRef.current = null;
      }
      // 清理挂载到window上的函数
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
