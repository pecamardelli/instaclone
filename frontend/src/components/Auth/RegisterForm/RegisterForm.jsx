import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import './RegisterForm.scss';

export default function RegisterForm(props) {
    const { setShowLogin } = props;

    const handleSubmit = () => {
        console.log('Form sent...');
    };

    return (<>
        <h2 className='register-form-title'>
            Register to Instaclone and share photos and videos.
        </h2>
        <Form className='register-form' onSubmit={handleSubmit}>
            <Form.Input 
                type='text'
                placeholder='Your name...'
                name='name'
            />
            <Form.Input 
                type='text'
                placeholder='Your username...'
                name='username'
            />
            <Form.Input 
                type='text'
                placeholder='Your email...'
                name='email'
            />
            <Form.Input 
                type='password'
                placeholder='Your password...'
                name='password'
            />
            <Form.Input 
                type='password'
                placeholder='Your password again...'
                name='passwordAgain'
            />
            <Button className='btn-submit' type='submit'>
                Register
            </Button>
        </Form>
    </>);
}
