"use client";

import dynamic from "next/dynamic";
import p5Types from "p5";

const Sketch = dynamic(() => import('react-p5'), {
    loading: () => null,
    ssr: false
});

const P5Component = () => {
    // 画像などのロードを行う
    const preload = (p5: p5Types) => {
    };

    // 初期処理
    const setup = (p5: p5Types, canvasParentRef: Element) => {
        // 背景の大きさ設定
        // 画面サイズに合わせるようにしている
        p5.createCanvas(p5.windowWidth, p5.windowHeight);
        
        // 背景色設定
        p5.background(0);
        
        // オブジェクトの設置
        // キャンバス内の中心に100pxの丸を表示する
        p5.ellipse(p5.windowWidth / 2, p5.windowHeight / 2, 100);

        // オブジェクトの色設定
        p5.fill(255, 255 , 0);
    };

    // 1フレームごとの処理
    const draw = (p5: p5Types) => {
    };

    // コンポーネントのレスポンシブ化
    const windowResized = (p5: p5Types) => {
        p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    };

    return (
        <Sketch
            preload={preload}
            setup={setup}
            draw={draw}
            windowResized={windowResized}
        />
    );
};

export default P5Component;