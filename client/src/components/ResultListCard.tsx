import { Button, Text, Card } from '@geist-ui/core';

interface ResultListCardProps {
    id: string;
    title: React.ReactNode | string;
    desc: React.ReactNode | string;
    actionButtonText: string;
    action: (itemId: string) => void;
}
const ResultListCard: React.FC<ResultListCardProps> = ({ id, title, desc, actionButtonText, action }) => {
    return <Card type={'success'} width={'100%'} style={{ margin: '8px' }}>
        <Text h4 my={0} style={{ textTransform: 'uppercase' }}>{title}</Text>
        <Text>{desc}</Text>
        <Card.Footer>
            <Button auto type={'success-light'} onClick={() => action(id)}>{actionButtonText}</Button>
        </Card.Footer>
    </Card>
}

export default ResultListCard;