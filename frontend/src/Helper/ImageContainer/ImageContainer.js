import './ImageContainer.css';
const ImageContainer = (props) => {
    return (
        <div className='image-container box-shadow'>
            <img alt={'group'} src={props.src ? props.src : 'https://i.imgur.com/SNl3ZA8.jpg'}/>
        </div>
    );
};

export default ImageContainer;