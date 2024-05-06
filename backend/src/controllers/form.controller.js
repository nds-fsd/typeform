const Form = require('../schemas/form.schema')

const getAllForms = async (req, res) => {
    // // clase de lunes 06/05, la forma mas simple sin error handling
    // const all = Form.find();
    // res.json(all)

    // Test en mentoria Slack 06/05
    // const forms = await Form.find()
    // console.log(forms)
    // res.status(200).json('ok')

    await Form.find()
        .then(forms => { res.json(forms) })
        .catch(error => {
            console.log('error fetching forms:', error);
            res.status(500).json({ error: 'Failed to fetch forms' })
        });
};

const getForm = (req, res) => {
    const formId = req.params.id;
    Form.findById(formId)
        .then(formFound => {
            if (!formFound) {
                return res.status(404)
            };
            return res.status(200).json(formFound);
        })
        .catch(error => {
            console.log('error getting form', error);
            res.status(404).json({ error: 'failed to get form' })
        })
}

const createForm = async (req, res) => {
    const body = req.body;
    const data = {
        title: body.title,
        status: 'Active',
        creationDateTime: new Date(),
    };
    const newForm = new Form(data);
    await newForm.save();
    res.send(newForm);

    // await Form.create({
    //     title: body.title,
    //     status: 'Active',
    //     creationDateTime: new Date(),
    // })
    //     .then(createdForm => {
    //     res.json(createForm)
    // })
    // .catch(error => {
    //     console.error('Error creating form:', error);
    //     res.status(500).json({ error: 'Failed to create form' });
    // })
};
const updateForm = async (req, res) => {
    const formId = req.params.id;
    const body = req.body;
    await Form.findByIdAndUpdate(formId, body, {
        title: body.title,
        //status: body.status
        //editDateTime: new Date(),
    })
        .then(
            res.json(Form)
        )
        .catch(error => {
            console.error('Error updating form:', error);
            res.status(500).json({ error: 'Failed to update form' });
        })

};

const deleteForm = async (req, res) => {
    const formId = req.params.id;

    await Form.findByIdAndDelete(formId)
        .then(deletedForm => {
            res.json(console.log('form deleted successfully', deletedForm));
        })
        .catch(error => {
            console.log('error deleting form', error);
            res.status(500).json({ error: 'failed to delete form' })
        })
};


module.exports = { getAllForms, getForm, createForm, updateForm, deleteForm }