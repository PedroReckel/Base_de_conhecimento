module.exports = {
    categoryWithChildren: `
        WITH RECURSIVE subcategories (id) AS (
            SELECT id FROM categories WHERE id = ?
            UNION ALL
            SELECT c.id FROM subcategories, categories c
                WHERE "parentId" = subcategories.id
        )
        SELECT id FROM subcategories
    `
}

/*
Essa consulta SQL irá retornar todos os IDs das subcategorias da categoria com ID igual a que foi passada na requisição, 
incluindo as subcategorias das subcategorias, e assim por diante. É uma forma de percorrer a estrutura de categorias de forma recursiva.
*/