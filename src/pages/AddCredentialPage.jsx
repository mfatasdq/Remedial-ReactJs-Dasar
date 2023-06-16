import { useState } from "react";
import { Box, Button, FormControl, FormLabel, Heading, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function AddCredentialPage() {
    const navigate = useNavigate();

    const [nama, setName] =useState('');
    const [url, setUrl] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await fetch ("http://localhost:3366/credentials", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nama: nama,
                    url: url,
                    username: username,
                    password: password,
                }),
            });
            
            navigate("/credentials")
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <VStack spacing={4} w="100%">
            <Heading as='h2' size="xl">
                Add New Credentials     
            </Heading>
            <Box w="80%">
                <form onSubmit={handleSubmit}>
                    <VStack>
                        <FormControl>
                            <FormLabel>Nama</FormLabel>
                            <input type="text" placeholder="please enter name" w="100%" 
                            onChange={(e) => setName(e.target.value)} value={nama} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>URL</FormLabel>
                            <input type="text" placeholder="please enter url" w="100%"
                            onChange={(e) => setUrl(e.target.value)} value={url} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Username</FormLabel>
                            <input type="text" placeholder="please enter username" w="100%"
                            onChange={(e) => setUsername(e.target.value)} value={username} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Password</FormLabel>
                            <input type="text" placeholder="please enter password" w="100%"
                            onChange={(e) => setPassword(e.target.value)} value={password} />
                        </FormControl>
                        <Button colorScheme="yellow" w="100%" type="submit">Add Credential</Button>
                    </VStack>
                </form>
            </Box>
        </VStack>
    )
}


export default AddCredentialPage;