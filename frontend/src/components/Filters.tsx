import React from 'react';
import {Form} from 'react-bootstrap';

interface FiltersProps {
    searchTerm: string;
    onSearchChange: (term: string) => void;
    sortItem: string;
    onSortChange: (item: string) => void;
    sortOrder: string;
    onSortOrderChange: (order: string) => void;
}

const Filers: React.FC<FiltersProps> = ({
                                            searchTerm,
                                            onSearchChange,
                                            sortItem,
                                            onSortChange,
                                            sortOrder,
                                            onSortOrderChange,
                                        }) => {
    return (
        <>
            <Form.Control
                type="text"
                placeholder="Поиск по наименованию..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="mb-3"
            />
            <Form.Select
                value={sortItem}
                onChange={(e) => onSortChange(e.target.value)}
                className="mb-3"
            >
                <option value="name">Имя</option>
                <option value="createdAt">Дата</option>
                <option value="type">Тип</option>
            </Form.Select>
            <Form.Select
                value={sortOrder}
                onChange={(e) => onSortOrderChange(e.target.value)}
                className="mb-3"
            >
                <option value="asc">По возрастанию</option>
                <option value="desc">По убыванию</option>
            </Form.Select>
        </>
    );
};

export default Filers;
