const MessageImage = ({myMsg, imageSrc}) => {
    return (
        <div
            className={'send-img'}
            style={{
                borderColor: myMsg && 'var(--white)',
                alignSelf: !myMsg && 'flex-start'
        }}>
            <img alt={'send-message'} src={imageSrc}/>
        </div>
    );
};

export default MessageImage;