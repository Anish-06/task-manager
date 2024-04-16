import React, { useEffect, useState } from "react";

const Manage = () => {
    const [data, setData] = useState({
        title: "",
        description: "",
        dueDate: "",
    });

    const [record, setRecord] = useState([]);
    const [editIndex, setEditIndex] = useState(null);

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editIndex !== null) {
            const updatedTasks = [...record];
            updatedTasks[editIndex] = data;
            setRecord(updatedTasks);
            setEditIndex(null);
            localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        } else {
            setRecord([...record, data]);
            localStorage.setItem("tasks", JSON.stringify([...record, data]));
        }
        setData({
            title: "",
            description: "",
            dueDate: "",
        });
    };

    const handleEdit = (index) => {
        setData(record[index]);
        setEditIndex(index);
    };

    const handleDelete = (index) => {
        const updatedTasks = [...record];
        updatedTasks.splice(index, 1);
        setRecord(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    };

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem("tasks"));
        if (storedTasks) {
            setRecord([...storedTasks]);
        }
    }, []);

    return (
        <div className="flex justify-center">
            <div className="max-w-3xl w-full bg-blue-300">
				<div className="text-4xl font-semibold text-center pt-7">Task Manager</div>
                <form onSubmit={handleSubmit} className="p-10">
                    <div className="w-full flex flex-col py-4">
                        <label htmlFor="title" className="text-2xl font-bold pb-1">
                            Title
                        </label>
                        <input
                            type="text"
                            className="w-full h-10 text-2xl"
                            name="title"
                            value={data.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="w-full flex flex-col py-4">
                        <label htmlFor="description" className="text-2xl font-bold pb-1">
                            Description
                        </label>
                        <input
                            type="text"
                            className="w-full h-10 text-2xl"
                            name="description"
                            value={data.description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="w-full flex flex-col py-4">
                        <label htmlFor="dueDate" className="text-2xl font-bold pb-1">
                            Due Date
                        </label>
                        <input
                            type="date"
                            className="w-full h-10 text-2xl"
                            name="dueDate"
                            value={data.dueDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <input type="submit" value={editIndex !== null ? "Update" : "Submit"} className="bg-lime-500 px-4 py-2 text-2xl font-medium rounded-md mt-4 cursor-pointer" />
                </form>
                <hr />
                <div className="text-xl px-10">
                    {record?.map((item, index) => (
                        <div className="py-4" key={index}>
                            <div className="flex">
                                <div className="font-bold">Title: </div>
                                <div>{item.title}</div>
                            </div>
                            <div className="flex">
                                <div className="font-bold">Description: </div>
                                <div>{item.description}</div>
                            </div>
                            <div className="flex">
                                <div className="font-bold">Due Date: </div>
                                <div>{item.dueDate}</div>
                            </div>
                            <div>
                                <button onClick={() => handleEdit(index)} className="bg-blue-500 px-7 py-2 text-2xl font-medium rounded-md mt-2 mr-4 cursor-pointer">Edit</button>
                                <button onClick={() => handleDelete(index)} className="bg-red-500 px-4 py-2 text-2xl font-medium rounded-md mt-2 cursor-pointer">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Manage;
