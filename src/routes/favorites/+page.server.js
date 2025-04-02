import { createConnection } from '$lib/db/mysql';

export async function load({ locals }) {
    let connection = await createConnection();

    const [articleRows] = await connection.execute('select * from articles;');
    const [favouritesRows] = await connection.execute('select * from favorites;');
    

    return {
        user: locals.user,
        articles: articleRows,
        favorites: favouritesRows
    };
}
