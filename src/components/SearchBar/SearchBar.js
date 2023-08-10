import TextField from "@mui/material/TextField";
import './SearchBar.css';

const SearchBar = ({
    inputValue
}) => {
    return (
        <div className="main-search">
            <div className="search">
                <TextField
                    id="outlined-basic"
                    onChange={inputValue}
                    variant="outlined"
                    fullWidth
                    label="Search by keyword..."
                    placeholder="Search by keyword..."
                />
            </div>
        </div>
    );
}

export default SearchBar;