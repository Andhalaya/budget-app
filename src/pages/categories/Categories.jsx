import { useState } from "react";
import * as Icons from "../../assets/Icons";
import { useCategories } from "../../hooks/useCategories";
import "./Categories.css";

export default function Categories() {
    const {
        categories,
        loading,
        addOrUpdateCategory,
        editCategoryName,
        addSubcategory,
        editSubcategory,
        deleteCategory,
        deleteSubcategory
    } = useCategories();

    const [name, setName] = useState("");
    const [editId, setEditId] = useState(null);
    const [subcategoryName, setSubcategoryName] = useState("");
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [editingSubcategory, setEditingSubcategory] = useState(null);
    const [newSubcategoryName, setNewSubcategoryName] = useState("");
    const [editingCategory, setEditingCategory] = useState(null);
    const [newCategoryName, setNewCategoryName] = useState("");
    const [showCategoryForm, setShowCategoryForm] = useState(false);
    const [showSubcategoryForm, setShowSubcategoryForm] = useState(false);

    // Handle Category Submission
    const handleSubmit = (e) => {
        e.preventDefault();
        addOrUpdateCategory(name, [], editId);
        setName("");
        setEditId(null);
    };

    // Handle Adding a Subcategory
    const handleAddSubcategory = (e) => {
        e.preventDefault();
        if (selectedCategoryId && subcategoryName.trim()) {
            addSubcategory(selectedCategoryId, subcategoryName);
            setSubcategoryName("");
        }
    };

    // Handle Editing a Category Name
    const handleEditCategory = (category) => {
        setEditingCategory(category.id);
        setNewCategoryName(category.name);
    };

    // Save Edited Category Name
    const handleSaveCategory = () => {
        if (editingCategory && newCategoryName.trim()) {
            editCategoryName(editingCategory, newCategoryName);
            setEditingCategory(null);
            setNewCategoryName("");
        }
    };

    // Handle Editing a Subcategory
    const handleEditSubcategory = (categoryId, subcategory) => {
        setEditingSubcategory({ categoryId, subcategory });
        setNewSubcategoryName(subcategory);
    };

    // Save Edited Subcategory
    const handleSaveSubcategory = () => {
        if (editingSubcategory && newSubcategoryName.trim()) {
            editSubcategory(editingSubcategory.categoryId, editingSubcategory.subcategory, newSubcategoryName);
            setEditingSubcategory(null);
            setNewSubcategoryName("");
        }
    };

    return (
        <div className="categories">
            <h1>Manage Categories & Subcategories</h1>

            {/* Category Form */}
            <div className="category-form">
                {showCategoryForm ?  <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Category Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <button type="submit">Add</button>
                    <button onClick={() => setShowCategoryForm(false)}>cancel</button>
                </form> 
                : <button className="add-btn" onClick={() => setShowCategoryForm(true)}>+ Add category </button>
                
            }
                {/* Add Subcategory Form */}
                {showSubcategoryForm ? 
                <form onSubmit={handleAddSubcategory}>
                    <select
                        onChange={(e) => setSelectedCategoryId(e.target.value)}
                        value={selectedCategoryId || ""}
                        required
                    >
                        <option value="" disabled>Select Category</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                    <input
                        type="text"
                        placeholder="Subcategory Name"
                        value={subcategoryName}
                        onChange={(e) => setSubcategoryName(e.target.value)}
                        required
                    />
                    <button type="submit">Add Subcategory</button>
                    <button onClick={() => setShowSubcategoryForm(false)}>cancel</button>
                </form> 
                : <button className="add-btn" onClick={() => setShowSubcategoryForm(true) }>+ Add subcategory</button>} 
            </div>


            {/* Category List */}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="categories-list">
                    <div className="categories-box">
                        <h3>Categories</h3>
                        <div className="box">
                            {categories.map((category) => (
                                <div className="list-element" key={category.id}>
                                    {editingCategory === category.id ? (
                                        <>
                                            <input
                                                type="text"
                                                value={newCategoryName}
                                                onChange={(e) => setNewCategoryName(e.target.value)}
                                            />
                                            <button onClick={handleSaveCategory}>Save</button>
                                        </>
                                    ) : (
                                        <div className="flex">
                                            <div>{category.name}</div>
                                            <div className="actions">
                                                <Icons.HiPencil className="icon" onClick={() => handleEditCategory(category)} />
                                                <Icons.MdDelete className="icon" onClick={() => deleteCategory(category.id)} />
                                            </div>

                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="subcategories-box">
                        <h3>Subcategories</h3>
                        <div className="box">
                            {categories.map((category) => (
                                <div className="subcategories" key={category.id}>
                                    <div className="category-name">{category.name}</div>
                                    {category.subcategories.map((sub, index) => (
                                        <div className="list-element" key={index}>
                                            {editingSubcategory?.subcategory === sub ? (
                                                <>
                                                    <input
                                                        type="text"
                                                        value={newSubcategoryName}
                                                        onChange={(e) => setNewSubcategoryName(e.target.value)}
                                                    />
                                                    <button onClick={handleSaveSubcategory}>Save</button>
                                                </>
                                            ) : (
                                                <div className="flex">
                                                    {sub}
                                                    <div className="actions">
                                                        <Icons.HiPencil className="icon" onClick={() => handleEditSubcategory(category.id, sub)} />
                                                        <Icons.MdDelete className="icon" onClick={() => deleteSubcategory(category.id, sub)} />
                                                    </div>

                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            )}
        </div>
    );
}

