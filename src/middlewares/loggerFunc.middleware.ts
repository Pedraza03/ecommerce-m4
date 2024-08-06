import { NextFunction, Request, Response } from 'express';


export function LoggerFuncMiddleware (req: Request, res: Response, next: NextFunction) {
    const getDate = () => {
      return new Date().toLocaleString(`en-US`,{
        timeZone: "America/Bogota"
      })
    }
    console.log(`${req.method}/${req.url} - Reques time:${getDate()}`)
    
    next();
  
}
