var expect=require('expect'); // Doc: https://www.npmjs.com/package/expect
var Todos=require('../../src_server/db/todos_file.js'); // Tested module

describe('Todos interfaces', function() {

  describe('todos_file.js interface', function() {

    it('empty()', function(done) {
      Todos.empty('tester',function onSuccess(data){
        expect(data.length).toBe(0);
        done();
      });
    });

    it('get_all()', function(done) {
      Todos.get_all({},'tester',function onSuccess(data){
        expect(data.length).toBe(0);
        done();
      });
    });

    it('post_add_new()', function(done) {
      Todos.post_add_new(      {'done':false,'text':'todo text0'},'tester',function onSuccess(data){
        expect(data).toInclude({'done':false,'text':'todo text0','id':0});
        Todos.post_add_new(      {'done':false,'text':'todo text1'},'tester',function onSuccess(data){
          expect(data).toInclude({'done':false,'text':'todo text1','id':1});
          Todos.post_add_new(      {'done':false,'text':'todo text2'},'tester',function onSuccess(data){
            expect(data).toInclude({'done':false,'text':'todo text2','id':2});
            Todos.get_all({},'tester',function onSuccess(data){
              expect(data.length).toBe(3);
              done();
            });
          });
        });
      });
    });

    it('put_update_one()', function(done) {
      Todos.put_update_one({'done':false,'text':'todo text00','id':0},'tester',function onSuccess(data){
        Todos.get_all({},'tester',function onSuccess(data){
          expect(data).toInclude({'done':false,'text':'todo text00','id':0});
          done();
        });
      });
    });

    it('delete_one()', function(done) {
      Todos.delete_one({id:0},'tester',function onSuccess(data){
        Todos.get_all({},'tester',function onSuccess(data){
          expect(data.length).toBe(2);
          expect(data).toNotInclude({'done':false,'text':'todo text00','id':0});
          done();
        });
      });
    });





    it('empty()', function(done) {
      Todos.empty('tester',function onSuccess(data){
        expect(data.length).toBe(0);
        done();
      });
    });

    it('process() listTodos', function(done) {
      Todos.process({action:'listTodos',filter:'list all'},'tester',function onSuccess(data){
        expect(data.arr.length).toBe(0);
        done();
      });
    });

    it('process() addTodo', function(done) {
      Todos.process(      {action:'addTodo',text:'todo text0'},'tester',function onSuccess(data){
        Todos.process(      {action:'addTodo',text:'todo text1'},'tester',function onSuccess(data){
          Todos.process(      {action:'addTodo',text:'todo text2'},'tester',function onSuccess(data){
              Todos.get_all({},'tester',function onSuccess(data){
              expect(data.length).toBe(3);
              expect(data).toInclude({'done':false,'text':'todo text0','id':0});
              expect(data).toInclude({'done':false,'text':'todo text1','id':1});
              expect(data).toInclude({'done':false,'text':'todo text2','id':2});
            done();
            });
          });
        });
      });
    });

    it('process() toggleTodo', function(done) {
      Todos.process({action:'toggleTodo',num:0},'tester',function onSuccess(data){
        Todos.get_all({},'tester',function onSuccess(data){
          expect(data).toInclude({'done':true,'text':'todo text0','id':0});
          done();
        });
      });
    });

    it('process() deleteTodo', function(done) {
      Todos.process({action:'deleteTodo',num:0},'tester',function onSuccess(data){
        Todos.get_all({},'tester',function onSuccess(data){
          expect(data.length).toBe(2);
          expect(data).toNotInclude({'done':false,'text':'todo text0','id':0});
          done();
        });
      });
    });

  });

});
