const Index = () => {
  // This variable use for getting current year & use for showing copyright year
  const date = new Date();

  return (
    <footer>
      <div className="flex justify-center">
        <div className="absolute bottom-0 text-gray-500">© {date.getFullYear()}-Present, Bytes Teams by Bytes Technolab. All rights reserved.</div>
      </div>
    </footer>
  )
}

export default Index