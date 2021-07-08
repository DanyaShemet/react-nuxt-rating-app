import CoursesIcon from '../layout/Menu/icons/courses.svg';
import ServicesIcon from '../layout/Menu/icons/services.svg';
import BookIcon from '../layout/Menu/icons/books.svg';
import GoodsIcon from '../layout/Menu/icons/goods.svg';
import { FirstLevelMenuItem } from '../interfaces/menuInterface';
import { TopLevelCategory } from '../interfaces/page.interface';



export const firstLevelMenu:FirstLevelMenuItem[] = [
    {route: 'courses', name: 'Курсы', icon: <CoursesIcon />, id: TopLevelCategory.Courses},
    {route: 'services', name: 'Сервисы', icon: <ServicesIcon />, id: TopLevelCategory.Services},
    {route: 'books', name: 'Книги', icon: <BookIcon />, id: TopLevelCategory.Books},
    {route: 'products', name: 'Товары', icon: <GoodsIcon />, id: TopLevelCategory.Products}
  ];