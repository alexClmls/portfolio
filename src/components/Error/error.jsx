import { Link } from 'react-router-dom'


function Error() {
    return (
        <><span>404</span><p>Oups! La page que vous demandez n'existe pas.</p><Link id='errorBack' to="/">Retourner sur la page d'accueil</Link></>
    )
  }
  
  export default Error