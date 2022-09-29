import * as React from 'react';
import { useEffect, useRef  } from 'react';
let ctx = null;
const FrostyFractalCanvas = props => {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
      // довжина сторін задані + 100
      if (!!ctx){
          drawFract({x:100, y:100},{x:500, y:100},  {x:500, y:500}, {x: 100, y:500}, props.limit, ctx)
      }
  })

  function drawLine(p0, p1) {
      ctx.beginPath();
      ctx.moveTo(p0.x, p0.y);
      ctx.lineTo(p1.x, p1.y);
              
      ctx.strokeStyle = props.color;
      ctx.lineWidth = 1;
      ctx.stroke();
      
    }

    function drawRound(p0, p1, p2, p3, ctx) {
      drawLine(p0, p1, ctx)

      drawLine(p1, p2, ctx)

      drawLine(p2, p3, ctx)

      drawLine(p3, p0, ctx)
    }
    function drawThird(A, B, limit, ctx){
      
      if(limit > 0){
        const third = Math.sqrt(Math.pow(A.x - B.x,2) + Math.pow(A.y- B.y,2))/3
        if(A.x === B.x){
          //vertical line
          if(A.y<B.y){
            var lineA = {x:A.x-third,y:A.y+2*third}
            var lineB = {x:A.x,y:A.y+2*third}
            var C = {x: A.x, y: A.y+ third}
            var D = {x: A.x, y: A.y+ 2*third}
          }else{
            var lineA = {x:B.x,y:B.y+third}
            var lineB = {x:B.x + third,y:B.y+third}
            var D = {x: A.x, y: A.y - 2*third}
            var C = {x: A.x, y: A.y - third}
          }
          
        }else{
          //gorizontal line
          if(A.x<B.x){
            var lineA = {x:A.x + 2*third,y:A.y}
            var lineB = {x:A.x + 2*third,y:A.y+third}
            var C = {x: A.x + third, y: A.y}
            var D = {x: A.x + 2*third, y: A.y}
          }else{
            var lineA = {x:B.x +third,y:B.y - third}
            var lineB = {x:B.x +third,y:B.y}
            var D = {x: A.x - 2*third, y: A.y}
            var C = {x: A.x - third, y: A.y}
          }
        }
        
        drawLine(lineA, lineB, ctx)

        drawThird(lineA, lineB, limit-1, ctx)
        drawThird(lineB, lineA, limit-1, ctx)

        drawThird(A, C, limit-1, ctx)
        drawThird(C, D, limit-1, ctx)
        drawThird(D, B, limit-1, ctx)
      }
      else{
        return;
      }
    }
    function drawFract(p0, p1, p2,p3, limit, ctx){
      drawRound(p0,p1,p2, p3, ctx);
      if(limit>2){
        drawThird(p0, p1, limit-1, ctx)
        drawThird(p1, p2, limit-1, ctx)
        drawThird(p2, p3, limit-1, ctx)
        drawThird(p3, p0, limit-1, ctx)
      }
      
    }
    return <canvas ref={canvasRef} {...props}/>
  }
  export default FrostyFractalCanvas
