<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateTaskRequest;
use App\Models\Task;

class TaskController extends Controller
{

    public function index()
    {
     return Task::orderBy('created_at', 'desc')->get();
    }
    public function store(CreateTaskRequest $request)
    {
        $data = $request->validated();
        $created = Task::create($data);
        return response()->json($created, 201);
    }

    public function show($id)
    {
        $task = Task::find($id);

        if (!$task) {
            return response()->json(['message' => 'Task not found'], 404);
        }

        return response()->json($task);
    }

    public function update(CreateTaskRequest $request, $id)
    {
        $task = Task::find($id);

        if (!$task) {
            return response()->json(['message' => 'Task not found'], 404);
        }

        $data = $request->validated();
        $task->update($data);

        return response()->json($task);
    }
}
