export function findArrObjIndex(arr, lookUp, value){
    for(var i=0; i < arr.length; i++){
        if(arr[i][lookUp] === value){
            return i
        }
    }
}