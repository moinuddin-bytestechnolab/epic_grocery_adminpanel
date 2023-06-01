import { useEffect, useState } from "react";

const AscDescFunction = () => {
    const [data, setData] = useState([
        { id: 1, name: 'John', age: 25, salary: 50000 },
        { id: 2, name: 'Jane', age: 30, salary: 60000 },
        { id: 3, name: 'Bob', age: 35, salary: 55000 },
    ]);

    const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });

    const sortBy = (key : any) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
          direction = 'desc';
        }
    
        const sortedData = [...data].sort((a : any, b : any) => {
          if (a[key] < b[key]) return -1;
          if (a[key] > b[key]) return 1;
          return 0;
        });
    
        if (direction === 'desc') {
          sortedData.reverse();
        }
    
        setData(sortedData);
        setSortConfig({ key, direction });
      };

      useEffect(() => {
        sortBy('asc')
      },[])

      console.log('from ascDesc => ',data);
      

  return (
    <div>AscDescFunction</div>
  )
}

export default AscDescFunction