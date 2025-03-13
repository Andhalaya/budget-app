import { useState } from "react";
import * as Icons from "../../assets/Icons";
import { useCategories } from "../../hooks/useCategories";
import "./Categories.css";
import { categoryColors, categoryIcons } from "./CategoryConfig";
import DropdownSelector from "../../components/Dropdown/DropdownSelector";

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
    const [hoveredCategory, setHoveredCategory] = useState(null);
    const [color, setColor] = useState(categoryColors[0].value);
    const [icon, setIcon] = useState(categoryIcons[0].value);

    // Handle Category Submission
    const handleSubmit = (e) => {
        e.preventDefault();
        addOrUpdateCategory(name, color, icon, [], editId);
        setName("");
        setColor(categoryColors[0].value);
        setIcon(categoryIcons[0].value);
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
            <div className="title">
                <h1>Categories & Subcategories</h1>
                <h2>manage properties</h2>
            </div>
            <div className="c-content">
                <div className="left-container">
                    {loading ? (<p>Loading...</p>) : (
                        <div className="box">
                            <h3 className="box-title">CATEGORIES</h3>
                            <div className="categories-boxes">
                                {categories.map((category) => {
                                    const IconComponent = categoryIcons.find((icon) => icon.value === category.icon)?.component || <Icons.FaUtensils />;
                                    return (
                                        <div
                                            key={category.id}
                                            onMouseEnter={() => setHoveredCategory(category.id)}
                                            onMouseLeave={() => setHoveredCategory(null)}
                                        >
                                            {editingCategory === category.id ? (
                                                <div className="edit-box">
                                                    <div className="gap">
                                                        <input
                                                            type="text"
                                                            value={newCategoryName}
                                                            onChange={(e) => setNewCategoryName(e.target.value)}
                                                            className="save-input"
                                                        />
                                                        <div className="save-btn" onClick={handleSaveCategory}>Save</div>
                                                    </div>
                                                    <div style={{ backgroundColor: category.color }} className="element-box">{IconComponent}</div>
                                                </div>
                                            ) : (
                                                <div className="category-box">
                                                    {/* Show delete button only when hovering */}
                                                    {hoveredCategory === category.id && (
                                                        <div className="delete-container" onClick={() => deleteCategory(category.id)}>
                                                            <Icons.MdDelete />
                                                        </div>
                                                    )}
                                                    <div className="gap" style={{ marginBottom: '5px' }}>
                                                        {category.name}
                                                        <div className="edit-icon-container" onClick={() => handleEditCategory(category)}><Icons.HiPencil className="edit-icon"  /></div>
                                                        
                                                    </div>
                                                    <div style={{ backgroundColor: category.color }} className="element-box">{IconComponent}</div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                    <div className="forms-container">
                        {/* Category Form */}
                        <div className="box">
                            <h3 className="box-title">NEW SUBCATEGORY</h3>
                            {showCategoryForm ?
                                <form onSubmit={handleSubmit} className="subcategory-form">
                                    <input
                                        type="text"
                                        placeholder="Category Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                    <DropdownSelector options={categoryColors} selected={color} setSelected={setColor} type="color" />
                                    <DropdownSelector options={categoryIcons} selected={icon} setSelected={setIcon} type="icon" />
                                    <div type="submit">Add</div>
                                    <div onClick={() => setShowCategoryForm(false)}>cancel</div>
                                </form>
                                : <div className="add-btn" onClick={() => setShowCategoryForm(true)}>+ Add category </div>
                            }
                        </div>
                        {/* Add Subcategory Form */}
                        <div className="box">
                            <h3 className="box-title">NEW SUBCATEGORY</h3>
                            {showSubcategoryForm ?
                                <form onSubmit={handleAddSubcategory} className="subcategory-form">
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
                                    <div type="submit">Add Subcategory</div>
                                    <div onClick={() => setShowSubcategoryForm(false)}>cancel</div>
                                </form>
                                : <div className="add-btn" onClick={() => setShowSubcategoryForm(true)}>+ Add subcategory</div>}
                        </div>
                    </div>
                </div>
                <div className="right-container">
                    {/* Category List */}
                    {loading ? (
                        <p>Loading...</p>
                    ) : (<div className="subcategories-container box">
                        <h3 className="box-title">SUBCATEGORIES</h3>
                        {categories.map((category) => (
                            <div className="" key={category.id}>
                                <div className="">{category.name}</div>
                                {category.subcategories.map((sub, index) => (
                                    <div className="" key={index}>
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


                    )}

                </div>
            </div>

        </div>
    );
}

