export interface SideNavItem {
    title: string;
    link: string;
  }
  
  
  
  export interface Category {
    children?: Category[];
    //children: Category[] | Observable<Category[]> | null | undefined;
    id:number;
    nom: string;
   
  }
  
  export interface Book {
    id: number;
    nom: string;
    category: string;
    price: number;
    author: string;
  }

  export interface Patient {
    id: number;
    nom: string;
    prenom: string;
    age: number;
    maladie: string;
    medicament:[];
  }
  



 
  