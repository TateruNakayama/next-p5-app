"use client";

import dynamic from "next/dynamic";
import p5Types from "p5";

const Sketch = dynamic(() => import('react-p5'), {
    loading: () => null,
    ssr: false
});

const P5Component = () => {
    let basketX: number;
    let basketY: number;
    let basketWidth: number;
    let basketHeight: number;
    let acorns: { x: number, y: number }[] = [];
    let score: number = 0;
    let basketImg: p5Types.Image;
    let acornImg: p5Types.Image;

    // 画像などのロードを行う
    const preload = (p5: p5Types) => {
        basketImg = p5.loadImage('/images/basket.png'); // カゴの画像
        acornImg = p5.loadImage('/images/acorn.png'); // 🌰の画像
    };

    // 初期処理
    const setup = (p5: p5Types, canvasParentRef: Element) => {
        p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
        basketWidth = 100;
        basketHeight = 50;
        basketX = p5.windowWidth / 2 - basketWidth / 2;
        basketY = p5.windowHeight - basketHeight - 10;
    };

    // 1フレームごとの処理
    const draw = (p5: p5Types) => {
        p5.background(255,255,255);

        // カゴの描画
        p5.image(basketImg, basketX, basketY, basketWidth, basketHeight);

        // 🌰の描画と落下
        for (let i = acorns.length - 1; i >= 0; i--) {
            let acorn = acorns[i];
            acorn.y += 5;
            p5.image(acornImg, acorn.x, acorn.y, 20, 20);

            // カゴに入ったかどうかの判定
            if (acorn.y > basketY && acorn.x > basketX && acorn.x < basketX + basketWidth) {
                acorns.splice(i, 1);
                score++;
            } else if (acorn.y > p5.windowHeight) {
                acorns.splice(i, 1);
            }
        }

        // スコアの表示
        p5.fill(0);
        p5.textSize(32);
        p5.text(`Score: ${score}`, 10, 30);

        // 新しい🌰を追加
        if (p5.frameCount % 60 === 0) {
            acorns.push({ x: p5.random(20, p5.windowWidth - 20), y: 0 });
        }

        // カゴの移動
        if (p5.keyIsDown(p5.LEFT_ARROW)) {
            basketX -= 10;
        }
        if (p5.keyIsDown(p5.RIGHT_ARROW)) {
            basketX += 10;
        }
    };

    // コンポーネントのレスポンシブ化
    const windowResized = (p5: p5Types) => {
        p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
        basketY = p5.windowHeight - basketHeight - 10;
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