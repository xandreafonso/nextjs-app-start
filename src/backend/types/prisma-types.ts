export { };

declare global {

    namespace PrismaJson {
        type GenericData = {
            [key: string]: any
        }

        type OrmMetadata = GenericData
    }
}