// AddPasswordModal.tsx
import React, {useEffect, useState} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import {CreatePasswordEntityRequest} from "../types/PasswordEntityDto.ts";
import {createPasswordEntity} from "../services/passwords_entities.ts";

interface CreatePasswordEntityModalProps {
    show: boolean;
    onHide: () => void;
    onRefresh: () => void;
}

const CreatePasswordEntityModal: React.FC<CreatePasswordEntityModalProps> = ({show, onHide, onRefresh}) => {
    const [name, setName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [type, setType] = useState<'Website' | 'Email'>('Website');
    const [error, setError] = useState<string>('');

    useEffect(() => {
        if (show) {
            setName('');
            setPassword('');
            setType('Website');
            setError('');
        }
    }, [show]);

    const handleSubmit = async () => {
        if (!name || !password) {
            setError("Все поля обязательны");
            return;
        }

        if (type === 'Email' && !/\S+@\S+\.\S+/.test(name)) {
            setError("Введите корректный адрес электронной почты");
            return;
        }

        if (password.length < 8) {
            setError("Пароль должен содержать минимум 8 символов");
            return;
        }

        const requestData: CreatePasswordEntityRequest = {
            name: name,
            password: password,
            type: type === 'Website' ? 0 : 1,
        };

        try {
            await createPasswordEntity(requestData);

            onRefresh();
            onHide();
        } catch (error) {
            setError("Ошибка при сохранении записи");
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Добавить новую запись</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <div className="alert alert-danger">{error}</div>}
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Наименование</Form.Label>
                        <Form.Control
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control
                            type="text"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Тип</Form.Label>
                        <div>
                            <Form.Check
                                inline
                                type="radio"
                                label="Сайт"
                                value="Website"
                                checked={type === 'Website'}
                                onChange={() => setType('Website')}
                            />
                            <Form.Check
                                inline
                                type="radio"
                                label="Электронная почта"
                                value="Email"
                                checked={type === 'Email'}
                                onChange={() => setType('Email')}
                            />
                        </div>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Отмена
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Сохранить
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreatePasswordEntityModal;
