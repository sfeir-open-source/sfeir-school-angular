<!-- .slide: class="sfeir-basic-slide with-code" -->
# NGRX: Reducers
<br>
<div class="flex-row">
    <div class="half">
        <ul>
            <li>contient l'ensemble des actions</li>
            <li>contient le métier des actions</li>
            <li>Seul endroit ou l'on modifie le state</li>
            <li>une mutation est synchrone</li>
        </ul>
    </div>
    <div class="fill-rest">
        <pre class="big-code">
            <code data-trim>
                const _counterReducer = createReducer(initialState,
                  on(increment, state => state + 1),
                  on(decrement, state => state - 1),
                  on(reset, state => 0),
                );
 
                export function counterReducer(state, action) {
                  return _counterReducer(state, action);
                }
            </code>
        </pre>
    </div>
</div>
