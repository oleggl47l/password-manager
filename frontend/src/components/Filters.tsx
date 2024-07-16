import React from 'react';
import {Col, Form, Row} from 'react-bootstrap';

interface FiltersProps {
    searchTerm: string;
    onSearchChange: (term: string) => void;
    sortItem: string;
    onSortChange: (item: string) => void;
    sortOrder: string;
    onSortOrderChange: (order: string) => void;
}

const Filters: React.FC<FiltersProps> = ({
                                            searchTerm,
                                            onSearchChange,
                                            sortItem,
                                            onSortChange,
                                            sortOrder,
                                            onSortOrderChange,
                                        }) => {
    return (
        <div className="mb-3">
            <Form.Control
                type="text"
                placeholder="Поиск по наименованию..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="mb-3"
            />
            <Row className="mb-3">
                <Col>
                    <Form.Select
                        value={sortItem}
                        onChange={(e) => onSortChange(e.target.value)}
                    >
                        <option value="name">Имя</option>
                        <option value="createdAt">Дата</option>
                        <option value="type">Тип</option>
                    </Form.Select>
                </Col>
                <Col>
                    <Form.Select
                        value={sortOrder}
                        onChange={(e) => onSortOrderChange(e.target.value)}
                    >
                        <option value="asc">По возрастанию</option>
                        <option value="desc">По убыванию</option>
                    </Form.Select>
                </Col>
            </Row>
        </div>
    );
};

export default Filters;
