//features...
//1.Add Lessons
//2.Update Lessons
//3.Delete Lessons

//Imputs
// id: Number,
// name: String,
// description: String,
// duration: String,
// status: Boolean,
// image: String,
// url  :String,

const SelfDefenseAdmin = () => {
    return (
        <>
            <section>
                <form action="">
                    <label for="LessonId">Id:</label>
                    <input type="text" name="LessonId" required></input>

                    <label for="LessonName">Name:</label>
                    <input type="text" name="LessonName" required></input>

                    <label for="LessonDescritpion">Descritpion:</label>
                    <input type="text" name="LessonDescritpion" required></input>

                    <label for="LessonDuration">Duration:</label>
                    <input type="text" name="LessonDuration" required></input>

                    <label for="LessonStatus">Status:</label>
                    <input type="text" name="LessonStatus" required></input>

                    <label for="LessonImage">Image:</label>
                    <input type="text" name="LessonImage"               ></input>

                    <label for="LessonUrl">URL:</label>
                    <input type="text" name="LessonUrl" required></input>

                </form>
                <table id="Lesson-data-table" className="w-screen mt-6">
                    <thead>
                        <tr className="flex justify-evenly bg-dblue border-2 text-whitish">
                            <th className="w-full flex border-yellow-100 border-solid border-2">Name</th>
                            <th className="w-full flex border-yellow-100 border-solid border-2">Email</th>
                            <th className="w-full flex border-yellow-100 border-solid border-2">Enrollment number</th>
                            <th className="w-full flex border-yellow-100 border-solid border-2">Contact Number</th>
                            <th className="w-full flex border-yellow-100 border-solid border-2">Join Year</th>
                            <th className="w-full flex border-yellow-100 border-solid border-2">programme</th>
                            <th className="w-full flex border-yellow-100 border-solid border-2">Department</th>
                            <th className="w-full flex border-yellow-100 border-solid border-2">Position</th>
                            <th className="w-full flex border-yellow-100 border-solid border-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </section>
        </>
    )
}

export { SelfDefenseAdmin }