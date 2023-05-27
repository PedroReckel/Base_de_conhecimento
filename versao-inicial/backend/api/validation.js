// Métodos que vão nos ajudar nas validações dos dados durante o recebimento das requisições  

module.exports = app => {
    function existsOrError(value, msg) {
        if(!value) throw msg  // Se o valor for verdadeiro 
        if(Array.isArray(value) && value.length === 0) throw msg
        if(typeof value === 'string' && !value.trim()) throw msg // Se o valor for do tipo String e se ela estiver vazia
    }

    function notExistsOrError(value, msg) {
        try {
            existsOrError(value, msg)
        } catch(msg) {
            return
        } 
        throw msg
    }

    function equalsOrError(valueA, valueB, msg) {
        if(valueA !== valueB) throw msg
    }

    return { existsOrError, notExistsOrError, equalsOrError }
}