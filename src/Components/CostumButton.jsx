export default function CostumButton({ text, theme, onClick }) {
    return (
        <button type="submit" className={`costum-button-${theme}`} onClick={onClick}> 
            {text}
            <i className="bi bi-arrow-up-left-circle-fill"/>
        </button>
    )
}