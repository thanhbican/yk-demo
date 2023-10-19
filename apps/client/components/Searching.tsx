interface SearchingProps {
  searchValue: string
  dict: any
}

const Searching: React.FC<SearchingProps> = ({ searchValue, dict }) => {
  return (
    <h2 className="leading-none mb-4 italic">
      {dict['search']}: {decodeURIComponent(searchValue)}
    </h2>
  )
}

export default Searching
