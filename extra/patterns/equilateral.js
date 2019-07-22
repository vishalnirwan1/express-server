var n = process.argv[2];
equilateral_triangle(n);

function equilateral_triangle(num)
{
    var space = num-1;
   var str = "";
   var i,j;
    for( i=0;i<num;i++)
    {
        for( j=0;j<space;j++)
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
    console.log(str);
}
