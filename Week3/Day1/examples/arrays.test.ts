//to test the courses array 

let newCourses:any = [];

beforeEach(()=>{
    newCourses = ['Angular'];
});

describe('array testing', () => {
    
    beforeEach(()=>{
        newCourses.push('NextJS');
    })

    it('To test an array',()=>{
        //expect(newCourses).toStrictEqual(['Angular','NextJS'])
        expect(newCourses).toEqual(['Angular','NextJS']);
    })
    console.log(newCourses);
})



afterEach(()=>{
    newCourses=[];
})