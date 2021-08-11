import { SearchProps } from './Search.props';
import styles from './Search.module.css';
import cn from 'classnames';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { useState, KeyboardEvent } from 'react';
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
        <form className={cn(className, styles.search)} {...props} role="search">
                <Input 
                    placeholder='Поиск...' 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)} 
                    className={cn(className, styles.input)}
                    onKeyDown={(e) => handleKeyDown(e)}/>
                <Button
                    aria-label="Искать по сайту"
                    appearance='primary' 
                    className={styles.button} 
                    onClick={goToSearch}>
                    <SearchSVG />
                </Button>
        </form>
    );
};

