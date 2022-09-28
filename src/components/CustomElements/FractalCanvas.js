import * as React from 'react';
import { useEffect, useRef  } from 'react';
let ctx = null;
const FractalCanvas = props => {
  
    const canvasRef = useRef(null)
    useEffect(() => {
      const canvas = canvasRef.current
      ctx = canvas.getContext('2d')
      //Our first draw
      ctx.translate(0.5, 0.5);  // anti-alias trick
        if (!!ctx){
            drawFract({x:100, y:100},{x:300, y:100},  {x:300, y:300}, {x: 100, y:300}, 8, ctx)
        }
    }, [])

    function drawLine(p0, p1, color="red") {
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
                
                ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.stroke();
        
      }

      function drawTriangle(p0, p1, p2, p3, ctx) {
        drawLine(p0, p1, ctx)

        drawLine(p1, p2, ctx)

        drawLine(p2, p3, ctx)

        drawLine(p3, p0, ctx)

        const size = p1.x-p0.x
        const x = p0.x
        const y = p0.y
        ctx.beginPath();
        ctx.rect(x, y, size, size);
        ctx.fillStyle = "black";
        ctx.fill();
      }

      function drawFract(p0, p1, p2,p3, limit, ctx){
        if(limit > 0){
            const quart = (p1.x-p0.x)/4;
          const pA0 = {
              x: p0.x - quart,
              y: p0.y - quart
            },
            pB0 = {
              x: p0.x + quart,
              y: p0.y - quart
            },
            pC0 = {
              x: p0.x + quart,
              y: p0.y + quart
            },
                        pD0 = {
                          x: p0.x - quart,
              y: p0.y + quart
                        };
          const pA1 = {
              x: p1.x - quart,
              y: p1.y - quart
            },
            pB1 = {
              x: p1.x + quart,
              y: p1.y - quart
            },
            pC1 = {
              x: p1.x + quart,
              y: p1.y + quart
            },
                        pD1 = {
                          x: p1.x - quart,
              y: p1.y + quart
                        };
             const pA2 = {
              x: p2.x - quart,
              y: p2.y - quart
            },
            pB2 = {
              x: p2.x + quart,
              y: p2.y - quart
            },
            pC2 = {
              x: p2.x + quart,
              y: p2.y + quart
            },
                        pD2 = {
                          x: p2.x - quart,
              y: p2.y + quart
                        };
                    const pA3 = {
              x: p3.x - quart,
              y: p3.y - quart
            },
            pB3 = {
              x: p3.x + quart,
              y: p3.y - quart
            },
            pC3 = {
              x: p3.x + quart,
              y: p3.y + quart
            },
                        pD3 = {
                          x: p3.x - quart,
              y: p3.y + quart
                        };

            drawTriangle(p0,p1,p2, p3, ctx);
            drawFract(pA0, pB0, pC0,  pD0, limit - 1, ctx);
            drawFract(pA1, pB1, pC1,  pD1, limit - 1, ctx);
            drawFract(pA2, pB2, pC2,  pD2, limit - 1, ctx);
            drawFract(pA3, pB3, pC3,  pD3, limit - 1, ctx);
        }
        else{
          return;
        }
      }

    return <canvas ref={canvasRef} {...props}/>
  }
  export default FractalCanvas
