import { Component } from 'react'
import Textarea from '../../comps/Textarea';

export default class Preview extends Component {

    state = {
        code: "print('Hello,World!')",
        language: 'python',
        title: 'Sample Code Snippet',
        url: '',
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    handleSubmit = async event => {
        event.preventDefault();
        const path = window.location.pathname;
        const url = import.meta.env.VITE_API + "snippets" + path + '/';

        const response = await fetch(url, {
            credentials: "include",
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state)
        });

        if (response.ok) {
            const data = await response.json();
            this.setState({
                code: data.code,
                language: data.language,
                title: data.title,
                url: data.url
            });
            alert('Data Updated');
        } else {
            console.log("Error Happend")
        }
    }

    async componentDidMount() {
        const path = window.location.pathname;

        const url = import.meta.env.VITE_API + "snippets" + path;

        const response = await fetch(url, {
            credentials: "include",
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            const data = await response.json();
            this.setState({
                code: data.code,
                language: data.language,
                title: data.title,
                url: data.url
            });
        } else {
            console.log("Error Happend")
        }

    }

    render() {
        return < Textarea
            state={this.state}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
        />
    }
}
