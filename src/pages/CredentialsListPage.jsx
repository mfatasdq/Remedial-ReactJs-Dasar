import {useEffect, useState} from "react";
import { SimpleGrid, Heading, Flex, Button, Divider,Spacer } from "@chakra-ui/react";
import {useNavigate} from 'react-router-dom';
import CredentialCard from "../components/CredentialCard";

function CredentialsListPage(){
    const navigate  = useNavigate();
    const [credentials, setCredentials] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:3366/credentials");
            const data = await response.json();

            setCredentials(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData()
    }, [])
    
    const handleClickButton = (e) => {
        e.preventDefault();

        navigate("/credentials/add");
    };
    const handleClickDelete = async (id) => {
        try {
            await fetch(`http://localhost:3366/credentials${id}`, {
                method: 'DELETE',
            });
            navigate('/credentials', {replace: true});
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Flex my={4} mx={4}>
                <Heading>Credentials</Heading>
                <Spacer />
                <Button colorScheme="green" onClick={handleClickButton}>Add</Button>
            </Flex>
            <Divider />
            <SimpleGrid column={3} spacing={4}>
                {credentials.length > 0 && credentials.map((credential, index) =>{
                    return <CredentialCard key={index} credential={credential} onDelete={handleClickDelete}/>;
                })}
            </SimpleGrid>
        </>
    );
}

export default CredentialsListPage;