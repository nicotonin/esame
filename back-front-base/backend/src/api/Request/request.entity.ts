import { User } from "../user/user.entity";

export interface Request1 {
  id?: string;
  dataInizio: Date;
  dataFine: Date;
  categoriaId: string;// FK categoria
  stato: 'In attesa' | 'Approvato' | 'Rifiutato';
  role1ID: string | User;// FK role1 (untente con meno accesso)
  role2ID?: string | User;// FK role2

}
