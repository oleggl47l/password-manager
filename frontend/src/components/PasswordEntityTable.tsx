// PasswordTable.tsx
import React, { useEffect, useState } from 'react';
import { Spinner, Table, Button } from 'react-bootstrap';
import { GetPasswordEntityResponse, PasswordEntityDto } from "../types/PasswordEntityDto.ts";
import { fetchPasswordEntities } from "../services/passwords_entities.ts";
import Filters from "./Filters.tsx";
import CreatePasswordEntityModal from "./CreatePasswordEntityModal.tsx";

const PasswordEntityTable: React.FC = () => {
    const [passwordEntities, setPasswordEntities] = useState<PasswordEntityDto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [sortItem, setSortItem] = useState<string>('createdAt');
    const [sortOrder, setSortOrder] = useState<string>('desc');
    const [modalShow, setModalShow] = useState<boolean>(false);

    useEffect(() => {
        loadPasswordEntities();
    }, []);

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

    const handleRowClick = (id: string) => {
        setPasswordEntities(prevEntities => {
            const updatedEntities = prevEntities.map(entity =>
                entity.id === id
                    ? { ...entity, isVisible: !entity.isVisible }
                    : entity
            );
            return updatedEntities;
        });
    };

    if (loading) {
        return (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        );
    }

    const filteredEntities = passwordEntities.filter(entity =>
        entity.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedEntities = filteredEntities.sort((a, b) => {
        const orderMultiplier = sortOrder === 'asc' ? 1 : -1;

        if (sortItem === 'name') {
            return orderMultiplier * a.name.localeCompare(b.name);
        }
        if (sortItem === 'createdAt') {
            return orderMultiplier * (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        }
        if (sortItem === 'type') {
            return orderMultiplier * a.type.localeCompare(b.type);
        }
        return 0;
    });

    return (
        <>
            <Filters
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                sortItem={sortItem}
                onSortChange={setSortItem}
                sortOrder={sortOrder}
                onSortOrderChange={setSortOrder}
            />
            <div className="text-center mb-3">
                <Button variant="primary" onClick={() => setModalShow(true)}>
                    Добавить запись
                </Button>
            </div>
            <CreatePasswordEntityModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                onRefresh={loadPasswordEntities}
            />
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Наименование</th>
                    <th>Пароль</th>
                    <th>Дата записи</th>
                </tr>
                </thead>
                <tbody>
                {sortedEntities.map((entity) => (
                    <tr key={entity.id} onClick={() => handleRowClick(entity.id)} style={{cursor: 'pointer'}}>
                        <td>{entity.name}</td>
                        <td>{entity.isVisible ? entity.password : '●●●●●●●●'}</td>
                        <td>{new Date(entity.createdAt).toLocaleString()}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </>
    );
};

export default PasswordEntityTable;
