const useGenre = (e)=>{
  if(e.length<1) return "";
  const GenreIds = e.map((g) => g.id);
  return GenreIds.reduce((acc, curr) => acc + "," + curr);
}

export default useGenre;