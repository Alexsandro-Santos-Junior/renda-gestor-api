// import { verifyToken } from '@clerk/clerk-sdk-node';
// import { Injectable, NestMiddleware } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { Response, NextFunction, Request } from 'express';
// import { DatabaseService } from './database/database.service';
// import { CreateUserDTO } from './user/dto';

// @Injectable()
// export class AuthMiddleware implements NestMiddleware {
//   private tokenErrorCount = 0;
//   private lastTokenErrorTimestamp = 0;

//   constructor(
//     private readonly env: ConfigService,
//     private readonly db: DatabaseService,
//   ) {}

//   async use(req: Request, res: Response, next: NextFunction) {
//     const token = req.headers.authorization?.split(' ')[1];

//     if (!token) {
//       const now = Date.now();

//       if (now - this.lastTokenErrorTimestamp > 5000) {
//         this.tokenErrorCount++;
//         this.lastTokenErrorTimestamp = now;

//         console.error('Token não fornecido - tentativa:', this.tokenErrorCount);

//         return res
//           .status(401)
//           .json({ message: 'Authorization token not found.' });
//       }

//       return;
//     }

//     try {
//       // console.log('Tentando verificar o token...');
//       const payload = await verifyToken(token, {
//         secretKey: this.env.getOrThrow<string>('CLERK_SECRET_KEY'),
//       });

//       // console.log('Token verificado com sucesso, payload:', payload);

//       const sub = payload.sub;

//       if (!sub) {
//         console.error('Token não contém "sub".');
//         return res.status(403).json({
//           message: 'Token não contém informações necessárias.',
//         });
//       }

//       const user = await this.db.user.findUnique({
//         where: { authProviderId: sub },
//       });

//       if (!user) {
//         console.error('Usuário não encontrado para sub:', sub);

//         if (
//           typeof payload.name === 'string' &&
//           typeof payload.email === 'string'
//         ) {
//           const newUserData: CreateUserDTO = {
//             name: payload.name,
//             email: payload.email,
//             authProviderId: payload.sub,
//           };

//           await this.db.user.create({ data: newUserData });
//         } else {
//           console.error(
//             'O payload não contém os campos necessários ou eles estão no formato incorreto.',
//           );
//           return res.status(400).json({ message: 'Dados inválidos no token.' });
//         }
//       }

//       req.user = user;

//       next();
//     } catch (err) {
//       console.error('Erro ao verificar token:', err);
//       return res.status(401).json({ message: 'Invalid or expired token.' });
//     }
//   }
// }
import { verifyToken } from '@clerk/clerk-sdk-node';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response, NextFunction, Request } from 'express';
import { DatabaseService } from './database/database.service';
import { CreateUserDTO } from './user/dto';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private tokenErrorCount = 0;
  private lastTokenErrorTimestamp = 0;

  constructor(
    private readonly env: ConfigService,
    private readonly db: DatabaseService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      const now = Date.now();

      if (now - this.lastTokenErrorTimestamp > 5000) {
        this.tokenErrorCount++;
        this.lastTokenErrorTimestamp = now;

        console.error('Token não fornecido - tentativa:', this.tokenErrorCount);

        return res
          .status(401)
          .json({ message: 'Authorization token not found.' });
      }

      return;
    }

    try {
      // console.log('Tentando verificar o token...');
      const payload = await verifyToken(token, {
        secretKey: this.env.getOrThrow<string>('CLERK_SECRET_KEY'),
      });

      // console.log('Token verificado com sucesso, payload:', payload);

      const sub = payload.sub;

      if (!sub) {
        console.error('Token não contém "sub".');
        return res.status(403).json({
          message: 'Token não contém informações necessárias.',
        });
      }

      const user = await this.db.user.findUnique({
        where: { authProviderId: sub },
      });

      if (!user) {
        console.error('Usuário não encontrado para sub:', sub);

        if (
          typeof payload.name === 'string' &&
          typeof payload.email === 'string'
        ) {
          const newUserData: CreateUserDTO = {
            name: payload.name,
            email: payload.email,
            authProviderId: payload.sub,
          };

          await this.db.user.create({ data: newUserData });
        } else {
          console.error(
            'O payload não contém os campos necessários ou eles estão no formato incorreto.',
          );
          return res.status(400).json({ message: 'Dados inválidos no token.' });
        }
      }

      req.user = user;

      next();
    } catch (err) {
      console.error('Erro ao verificar token:', err);
      return res.status(401).json({ message: 'Invalid or expired token.' });
    }
  }
}
