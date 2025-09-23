type titulo={
    titulo: string
}

function Header({titulo}:titulo){

    return(
        <>
        <header>
            <a href="https://www.ottokrause.edu.ar/">
                <img src="/escudo.png" alt="Escudo-de-la-escuela"/>
            </a>
            <h1>{titulo}</h1>
        </header>
        </>
        
    )
}

export default Header