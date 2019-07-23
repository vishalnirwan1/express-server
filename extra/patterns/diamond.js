 let n = process.argv[2];
 diamond_triangle(n);

 function diamond_triangle(num)
 {
    let space = num-1;
    let str   = "";
    let i,j;
     for( i = 0;i < num;i++)
     {
         for( j = 0;j < space;j++)
         {
             str += " ";
         }
         for ( j = 0; j <= i; j++) 
         {
            str += "* "; 
         }
         str += "\n";
         space--;
     }
     space = 0; 

     for ( i = num; i > 0; i--) 
     { 
         for ( j = 0; j < space; j++)
         {
         str += " ";   
         }
        for ( j = 0; j < i; j++) 
        {
         str += "* "; 
        }
         str += "\n";
         space++; 
     } 
     console.log(str);
 }
