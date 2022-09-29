import * as React from 'react';
import { useEffect, useRef  } from 'react';
let ctx = null;
const TfractalCanvas = props => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    
    ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = props.color;
    ctx.fillRect(100, 100, 400, 400);
    
      // довжина сторін задані + 100
      if (!!ctx){
          drawFract({x:200, y:200},{x:400, y:200},  {x:400, y:400}, {x: 200, y:400}, props.limit, ctx)
      }
  })

  function drawLine(p0, p1) {
      ctx.beginPath();
      ctx.moveTo(p0.x, p0.y);
      ctx.lineTo(p1.x, p1.y);
              
      ctx.strokeStyle = "black";
      ctx.lineWidth = 1;
      ctx.stroke();
      
    }

    function drawRound(p0, p1, p2, p3, ctx) {
      drawLine(p0, p1, ctx)

      drawLine(p1, p2, ctx)

      drawLine(p2, p3, ctx)

      drawLine(p3, p0, ctx)

      const size = p1.x-p0.x
      const x = p0.x
      const y = p0.y
      ctx.beginPath();
      ctx.fillStyle = "black";
      ctx.fillRect(x, y, size, size);
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

          drawRound(p0,p1,p2, p3, ctx);
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
  export default TfractalCanvas
