import {useEffect, useState} from 'react';
import {Table} from 'react-bootstrap';
import {fetchPasswordEntities} from "../services/passwords_entities.ts";
import {GetPasswordEntityResponse, PasswordEntityDto} from "../types/PasswordEntityDto.ts";

const PasswordTable = () => {
    const [passwordEntities, setPasswordEntities] = useState<PasswordEntityDto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadPasswordEntities = async () => {
            const data: GetPasswordEntityResponse = await fetchPasswordEntities();
            if (data) {
                const entitiesWithVisibility = data.passwordEntityDtos.map(entity => ({
                    ...entity,
                    isVisible: false,
                }));
                setPasswordEntities(entitiesWithVisibility);
            }
            setLoading(false);
        };

        loadPasswordEntities();
    }, []);

    const handleRowClick = (index: number) => {
        setPasswordEntities(prevEntities => {
            const updatedEntities = [...prevEntities];
            updatedEntities[index] = {
                ...updatedEntities[index],
                isVisible: !updatedEntities[index].isVisible,
            };
            return updatedEntities;
        });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>Наименование</th>
                <th>Пароль</th>
                <th>Дата записи</th>
            </tr>
            </thead>
            <tbody>
            {passwordEntities
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .map((entity, index) => (
                    <tr key={entity.id} onClick={() => handleRowClick(index)} style={{cursor: 'pointer'}}>
                        <td>{entity.name}</td>
                        <td>{entity.isVisible ? entity.password : '●●●●●●●●'}</td>
                        <td>{new Date(entity.createdAt).toLocaleDateString()}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default PasswordTable;
