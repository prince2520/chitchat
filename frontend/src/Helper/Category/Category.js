import './Category.css';
const Category = (props) => {
    return(
        <div className='category-btn'>
            <span>{props.title}</span>
        </div>
    );
};

export default Category;