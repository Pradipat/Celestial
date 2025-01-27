export default async function Page({ params }) {
    const slug = (await params).slug
    return (
        <div>
            Portfolio {slug[1]}
        </div>
    )
}