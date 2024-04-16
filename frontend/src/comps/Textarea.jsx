import PropTypes from 'prop-types'
import { Container } from '@mui/material';
import languages from '../libs/lang.js';
import './style.css';

import { useContext } from 'react';
import RootContext from '../contexts/Root';

const Textarea = ({ state, handleChange, handleSubmit }) => {

    const { code, language,title,url } = state;
    const { username } = useContext(RootContext);

    console.log("Language : ", language)

    return (
        <Container>
            {title && <p>Title : {title}</p>}
            {url && <div> <p>URL : {url} </p> </div>}
            <form onSubmit={handleSubmit} className='form'>
                {username && 
                <div className='top-container'>
                    <div className='lang-select'>
                        <label htmlFor="lang">Choose a Language:</label>
                        <select name="lang" id="lang" value={language} onChange={handleChange}>
                            {languages.map(language => (
                                <option key={language.id} value={language.name}>{language.name}</option>
                            ))}
                        </select>
                    </div>

                    {
                        url ?
                            <div className='btn-div'>
                                <button type="submit" className='btn'>Edit</button>
                            </div>
                            :
                            <div className='btn-div'>
                                <button type="submit" className='btn'>Share</button>
                            </div>
                    }

                </div>
                }

                <div className='text-area'>
                    <textarea
                        className="text"
                        name="code"
                        rows="20"
                        cols="40"
                        value={code}
                        onChange={handleChange}
                    ></textarea>
                </div>

            </form>
        </Container>
    )
}

Textarea.propTypes = {
    state: PropTypes.object,
    handleChange: PropTypes.func,
    handleSubmit: PropTypes.func,
}

Textarea.defaultValue = {
    state: {},
    handleChange: () => { },
    handleSubmit: () => { },
}

export default Textarea;