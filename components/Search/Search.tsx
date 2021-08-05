import { SearchProps } from './Search.props';
import styles from './Search.module.css';
import cn from 'classnames';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { useState } from 'react';
import SearchSVG from './search.svg';
import { useRouter } from 'next/router';
export const Search = ({className, ...props}: SearchProps) :JSX.Element => {

    const [search, setSearch] = useState<string>('');
    const router = useRouter();

    const goToSearch = () => {
        router.push({
            pathname: '/search',
            query: {
                q: search
            }
        });
    };

    const handleKeyDown = (e:KeyboardEvent) => {
        if (e.key === 'Enter') {
            goToSearch();
        }
    };

    return (
        <div className={cn(className, styles.search)} {...props}>
                <Input 
                    placeholder='Поиск...' 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)} 
                    className={cn(className, styles.input)}
                    onKeyDown={handleKeyDown}
                    />
                <Button 
                    appearance='primary' 
                    className={styles.button} 
                    onClick={goToSearch}>
                    <SearchSVG />
                </Button>
        </div>
    );
};

