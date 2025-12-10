
// 从环境变量中获取高德地图的Key
const AMAP_KEY = import.meta.env.VITE_AMAP_KEY;
const AMAP_SECURITY_JS_CODE = import.meta.env.VITE_AMAP_SECURITY_JS_CODE;


/**
 * 动态加载高德地图SDK
 * @returns Promise<void>
 */
export const loadMapSDK = (): Promise<void> => {
    return new Promise((resolve, reject) => {
        if (window.AMap) {
            resolve();
            return;
        }

        const script = document.createElement('script');
        script.src = `https://webapi.amap.com/maps?v=2.0&key=${AMAP_KEY}`;
        script.onload = () => {
            // @ts-ignore
            window._AMapSecurityConfig = {
                securityJsCode: `${AMAP_SECURITY_JS_CODE}`,
            }
            resolve();
        };
        script.onerror = () => {
            reject(new Error('高德地图SDK加载失败'));
        };
        document.head.appendChild(script);
    });
};

/**
 * 初始化地图
 * @param containerId - 地图容器的DOM ID
 * @param center - 地图中心点经纬度 [lng, lat]
 * @param zoom - 缩放级别
 * @returns AMap.Map 实例
 */
export const initMap = (containerId: string, center: [number, number], zoom: number = 15): AMap.Map => {
    return new window.AMap.Map(containerId, {
        center,
        zoom,
        viewMode: '3D' // 开启3D视图
    });
};

/**
 * 在地图上添加标记
 * @param map - AMap.Map 实例
 * @param position - 标记位置 [lng, lat]
 * @param options - 标记选项
 * @returns AMap.Marker 实例
 */
export const addMarker = (map: AMap.Map, position: [number, number], options?: AMap.MarkerOptions): AMap.Marker => {
    const marker = new window.AMap.Marker({
        position,
        ...options,
    });
    map.add(marker);
    return marker;
};

/**
 * 在地图上绘制折线
 * @param map - AMap.Map 实例
 * @param path - 折线路径 [[lng1, lat1], [lng2, lat2], ...]
 * @param options - 折线选项
 * @returns AMap.Polyline 实例
 */
export const drawPolyline = (map: AMap.Map, path: [number, number][], options?: AMap.PolylineOptions): AMap.Polyline => {
    const polyline = new window.AMap.Polyline({
        path,
        strokeColor: '#3366FF',
        strokeWeight: 6,
        strokeOpacity: 0.8,
        ...options,
    });
    map.add(polyline);
    return polyline;
};


/**
 * 根据环境处理导航跳转
 * @param lng - 目的地经度
 * @param lat - 目的地纬度
 * @param name - 目的地名称
 */
export const navigateTo = (lng: number, lat: number, name: string) => {
    const userAgent = navigator.userAgent;
    const isAlipay = /Alipay/i.test(userAgent);
    const isWechat = /MicroMessenger/i.test(userAgent);
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

    if (isAlipay) {
        // 支付宝：直接跳转到支付宝内置的高德地图小程序
        const scheme = `alipays://platformapi/startapp?appId=20000112&page=pages/navi/navi?latitude=${lat}&longitude=${lng}&name=${encodeURIComponent(name)}`;
        window.location.href = scheme;
    } else if (isWechat) {
        // 微信：提示用户手动操作，因为微信会拦截scheme
        // 更好的方案是使用微信JSSDK打开内置地图，但这需要后端配合签名
        alert(`请手动复制景点名称：${name}\n然后在地图应用中搜索导航`);
    } else if (isMobile) {
        // 外部浏览器（移动端）
        const amapApp = `iosamap://path?sourceApplication=applicationName&dlat=${lat}&dlon=${lng}&dname=${encodeURIComponent(name)}&dev=0&style=2`;
        const amapWeb = `https://m.amap.com/navi/?dest=${lng},${lat}&destName=${encodeURIComponent(name)}&hideRouteIcon=1`;

        const start = Date.now();
        window.location.href = amapApp;

        // 如果2.5秒后应用还没被拉起，则认为用户未安装高德地图，跳转到Web版
        setTimeout(() => {
            if (Date.now() - start < 2500) {
                window.open(amapWeb, '_blank');
            }
        }, 2000);
    } else {
        // PC端：直接打开高德地图网页版
        const amapWebPC = `https://www.amap.com/search?query=${encodeURIComponent(name)}&geoobj=${lng}|${lat}`;
        window.open(amapWebPC, '_blank');
    }
};
