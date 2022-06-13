import { Box, Button, Card, CardActions, CardContent, CircularProgress, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useAuthContext } from "../../context";
import * as yup from 'yup';

const loginSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required().min(5),
});


interface ILoginProps {
    children: React.ReactNode;
}
export const Login: React.FC<ILoginProps> = ({ children }) => {
    const { isAuthenticated, login } = useAuthContext();

    const [isLoading, setIsLoading] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleSubmit = () => {
        setIsLoading(true);
        loginSchema
            .validate({email, password}, {abortEarly: false})
            .then(dataValidate => {
                login(dataValidate.email, dataValidate.password)
                .then(() => {
                    setIsLoading(false);
                });
            })
            .catch((errors: yup.ValidationError) => {
                setIsLoading(false);
                errors.inner.forEach(error => {
                    if(error.path === 'email') {
                        setEmailError(error.message);
                    }else if (error.path === 'password') {
                        setPasswordError(error.message);
                    }
                })
            });
    }

    if ( isAuthenticated ) (
        <>{ children }</>
    );

    return (
        <Box width='100vw' height='100vh' display='flex' alignItems='center' justifyContent='center'>
            <Card>
                <CardContent>
                    <Box display='flex' flexDirection='column' gap={2} width={250}>
                        <Typography variant='h6' align='center'>Identifique-se</Typography>

                        <TextField
                           fullWidth
                           label='Email'
                           type='email'
                           value={email}
                           disabled={isLoading}
                           error={!!emailError}
                           helperText={emailError}
                           onChange={e => setEmail(e.target.value)}
                           onKeyDown={e => setEmailError('')}
                        />
                        
                        <TextField
                           label='Senha'
                           fullWidth
                           type='password'
                           value={password}
                           disabled={isLoading}
                           error={!!passwordError}
                           helperText={passwordError}
                           onChange={e => setPassword(e.target.value)}
                           onKeyDown={e => setPasswordError('')}
                        />
                    </Box>

                </CardContent>
                <CardActions>
                    <Box width='100%' display='flex' justifyContent='center'>
                        <Button
                          variant='contained'
                          disabled={isLoading}
                          onClick={handleSubmit}
                          endIcon={isLoading ? <CircularProgress variant='indeterminate' color='inherit' size={20} /> : undefined}
                        >
                            Login
                        </Button>

                    </Box>
                </CardActions>
            </Card>
        </Box>
    );
};